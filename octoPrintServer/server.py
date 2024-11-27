import os
import subprocess
import argparse

def start_octoprint():
    try:
        # Assuming OctoPrint is installed and available in the environment
        # Set up OctoPrint to run on localhost:5000
        subprocess.run(
            ["octoprint", "serve", "--host", "127.0.0.1", "--port", "5000"],
            check=True
        )
    except FileNotFoundError:
        print("Error: OctoPrint is not installed or not available in the PATH.")
    except subprocess.CalledProcessError as e:
        print(f"Error: Failed to start OctoPrint. {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

def main():
    parser = argparse.ArgumentParser(description="Control an OctoPrint server.")
    parser.add_argument(
        "command", choices=["start"], help="Command to control the OctoPrint server."
    )
    args = parser.parse_args()

    if args.command == "start":
        start_octoprint()

if __name__ == "__main__":
    main()
