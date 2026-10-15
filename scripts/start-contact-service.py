#!/usr/bin/env python3
"""Persistent supervisor for the contact service.

Starts the bun service in a fully detached way using start_new_session=True
which creates a new process group/session, preventing the parent shell
from sending signals when it exits.
"""
import os
import sys
import subprocess
import time
import signal

SERVICE_DIR = "/home/z/my-project/mini-services/contact-service"
LOG_FILE = os.path.join(SERVICE_DIR, "service.log")
PID_FILE = os.path.join(SERVICE_DIR, "service.pid")

def is_running(pid):
    try:
        os.kill(pid, 0)
        return True
    except (OSError, ProcessLookupError):
        return False

def kill_existing():
    if os.path.exists(PID_FILE):
        try:
            with open(PID_FILE) as f:
                old_pid = int(f.read().strip())
            if is_running(old_pid):
                os.kill(old_pid, signal.SIGTERM)
                time.sleep(1)
                if is_running(old_pid):
                    os.kill(old_pid, signal.SIGKILL)
        except (ValueError, FileNotFoundError):
            pass
        os.unlink(PID_FILE)

    # Also kill by pattern
    subprocess.run(
        ["pkill", "-f", "bun index.ts"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(1)

def start():
    kill_existing()

    # Open log file for append
    log_fd = os.open(LOG_FILE, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o644)

    # Start bun with new session - this detaches it from this Python's process group
    proc = subprocess.Popen(
        ["bun", "index.ts"],
        cwd=SERVICE_DIR,
        stdin=subprocess.DEVNULL,
        stdout=log_fd,
        stderr=log_fd,
        start_new_session=True,  # Critical: creates new session, detaching from this Python
        close_fds=True,
    )

    os.close(log_fd)

    with open(PID_FILE, "w") as f:
        f.write(str(proc.pid))

    print(f"Started bun service with PID {proc.pid}")
    print(f"Log: {LOG_FILE}")
    print(f"PID file: {PID_FILE}")

    # Don't wait - exit immediately so the parent shell can return
    # proc is in a new session so it won't get SIGHUP when this Python exits

if __name__ == "__main__":
    start()
