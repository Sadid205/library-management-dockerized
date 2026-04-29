import linkedin from "@/assets/linkedin-color-svgrepo-com.svg";
import facebook from "@/assets/facebook-svgrepo-com.svg";
import github from "@/assets/github-color-svgrepo-com.svg";
export function Footer() {
  return (
    <div className="fixed text-center gap-4 justify-center bottom-0 flex flex-col dark:border-gray-500 border-gray-900 border-t w-full h-32">
      <div className="flex gap-4 justify-center ">
        <a href="https://www.linkedin.com/in/abdullah-al-sadid/">
          <img width={30} src={linkedin} alt="Youtube" />
        </a>
        <a href="https://github.com/Sadid205">
          <img width={30} src={github} alt="Github" />
        </a>
        <a href="https://www.facebook.com/md.abdullahalsadid19/">
          <img src={facebook} width={30} alt="Facebook" />
        </a>
      </div>
      <p>&copy; All rights reserved by Md.Abdullah al sadid</p>
    </div>
  );
}
