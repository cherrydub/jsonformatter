import React from "react";

export default function Footer() {
  return (
    <div className="footer fixed bottom-0 left-0 flex flex-col text-center">
      <a href="https://github.com/cherrydub" target="_blank" title="Github">
        <i class="lab la-github"></i>
      </a>
      {/* <a href="https://twitter.com/cherrydub" target="_blank" title="Twitter">
        <i class="lab la-twitter"></i>
      </a>
      <a
        href="https://www.reddit.com/user/cherrydub"
        target="_blank"
        title="Reddit"
      >
        <i class="lab la-reddit"></i>
      </a> */}
      <a href="mailto:chriscoding@icloud.com" title="Email me">
        <i class="lab la-telegram"></i>
      </a>
    </div>
  );
}
