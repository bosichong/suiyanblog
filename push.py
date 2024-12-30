import subprocess
import time

def git_push():
    while True:
        try:
            subprocess.check_call(['git', 'push'])
            print("Git push successful!")
            break
        except subprocess.CalledProcessError as e:
            print(f"Git push failed with error {e}. Retrying in 5 seconds...")
            time.sleep(5)

def main():
    try:
        # 运行 node gs.js
        subprocess.check_call(['node', 'gs.js'])
    except subprocess.CalledProcessError as e:
        print(f"Node gs.js failed with error {e}.")
        return

    try:
        # 运行 node gr.js
        subprocess.check_call(['node', 'gr.js'])
    except subprocess.CalledProcessError as e:
        print(f"Node gr.js failed with error {e}.")
        return

    try:
        subprocess.check_call(['git', 'add', '.'])
        print("Git add successful.")
    except subprocess.CalledProcessError as e:
        print(f"Git add failed with error {e}.")
        return

    try:
        subprocess.check_call(['git', 'commit', '-m', '更新'])
        print("Git commit successful.")
    except subprocess.CalledProcessError as e:
        print(f"Git commit failed with error {e}.")
        return

    git_push()

if __name__ == "__main__":
    main()
