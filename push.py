# 这是一个循环提交GitHub pull的python脚本，首先执行git add.，最后执行git commit -m "更新"，
# 然后执行git push，如果git push 失败，就等待5秒后再次执行git push，直到git push成功为止。
import subprocess
import time

def git_push():
    while True:
        try:
            subprocess.check_call(['git', 'push'])
            print("Git push successful!")
            break
        except subprocess.CalledProcessError:
            print("Git push failed. Retrying in 5 seconds...")
            time.sleep(5)

def main():
    subprocess.check_call(['git', 'add', '.'])
    subprocess.check_call(['git', 'commit', '-m', '更新'])
    git_push()

if __name__ == "__main__":
    main()
