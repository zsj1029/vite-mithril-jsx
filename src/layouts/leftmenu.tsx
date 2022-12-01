import m from "mithril";

export default {
  view() {
    return (
      <>
        <div class="w-34 min-h-full px-1 select-none ">
          <ul>
            <li>
              <span class="menu flex items-center py-2 px-4 overflow-hidden  rounded transition duration-300 ease-in-out cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                  />
                </svg>
                数据看板
              </span>
            </li>
          </ul>
          <ul>
            <li>
              <span class="menu flex items-center py-2 px-4  overflow-hidden   rounded transition duration-300 ease-in-out cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
                许可证
              </span>
              <ul class=" accordion-collapse collapse">
                <li class="menu flex items-center pl-10 py-2  cursor-pointer overflow-hidden  rounded  transition duration-300 ease-in-out">
                  待确认
                </li>
                <li class="menu flex items-center pl-10 py-2  cursor-pointer overflow-hidden  rounded transition duration-300 ease-in-out">
                  已发送
                </li>
                <li class="menu flex items-center pl-10 py-2 cursor-pointer overflow-hidden  rounded  transition duration-300 ease-in-out">
                  即将到期
                </li>
                <li class="menu flex items-center pl-10 py-2 cursor-pointer overflow-hidden  rounded  transition duration-300 ease-in-out">
                  已过期
                </li>
                <li class="menu flex items-center pl-10 py-2 cursor-pointer overflow-hidden  rounded  transition duration-300 ease-in-out">
                  统计
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <span class="menu flex items-center py-2 px-4  overflow-hidden   rounded transition duration-300 ease-in-out cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                邮件记录
              </span>
              <ul class=" accordion-collapse collapse">
                <li class="menu flex items-center pl-10 py-2  cursor-pointer overflow-hidden  rounded  transition duration-300 ease-in-out">
                  全部
                </li>
                <li class="menu flex items-center pl-10 py-2  cursor-pointer overflow-hidden  rounded transition duration-300 ease-in-out">
                  发送失败
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <span class="menu flex items-center py-2 px-4  overflow-hidden   rounded transition duration-300 ease-in-out cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                用户管理
              </span>
              <ul class=" accordion-collapse collapse">
                <li class="menu flex items-center pl-10 py-2  cursor-pointer overflow-hidden  rounded  transition duration-300 ease-in-out">
                  用户列表
                </li>
                <li class="menu flex items-center pl-10 py-2  cursor-pointer overflow-hidden  rounded transition duration-300 ease-in-out">
                  创建用户
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <span class="menu flex items-center py-2 px-4  overflow-hidden   rounded transition duration-300 ease-in-out cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                修改密码
              </span>
            </li>
          </ul>

          <p class="fixed w-30 text-center bottom-4 ">Ver:1.0.0</p>
        </div>
      </>
    );
  },
};
