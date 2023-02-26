# 先执行bulid.bat，再执行release.bat

import os

# 执行命令


def exec_cmd(cmd):
    print("执行命令：" + cmd)
    os.system(cmd)


def release():
    # 1.复制文件
    ORIGINAL_PATH = './dist'
    TARGET_PATH = 'D:/python_project/fysite/'
    PROJECT_NAME = 'gpt_message_borad'
    DESTINATION_PATH = TARGET_PATH+PROJECT_NAME
    # 删除原有文件
    exec_cmd(f"del {DESTINATION_PATH}/*.*".replace('/', '\\')+" /s /q ")
    # 把ORIGINAL_PATH下的文件复制到DESTINATION_PATH下,覆盖原有文件
    exec_cmd(f"xcopy {ORIGINAL_PATH} {DESTINATION_PATH}".replace('/', '\\')+r" /s /e /y /i")
    # 2. 进入DESTINATION_PATH目录，执行git push
    # 输入提交信息
    commit_msg = input("请输入提交信息：")
    git_cmd = "cd"+ORIGINAL_PATH + " && git add . && git commit -m \"" + \
        commit_msg + "\" && git push -f"
    # 把git_cmd通过&&分割，然后分别执行
    for cmd in git_cmd.split("&&"):
        exec_cmd(cmd)


# main
if __name__ == "__main__":
    # build
    # exec_cmd("yarn build")
    # 运行release
    release()
    
