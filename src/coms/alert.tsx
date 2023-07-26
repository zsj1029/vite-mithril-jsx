import dialogPolyfill from "dialog-polyfill";

window.alert = async (text, cb?:any) => {
  const p = document.createElement("dialog");
  p.classList.add("alert");
  p.innerHTML = `
    <header>通知</header>
    <p class="pt-2 pb-4 whitespace-pre-line">${text}</p>
    <p class="space-x-2  flex justify-center min-w-[200px]">
      <button id="clearAlert">确认</button>
    </p>
  `;
  document.body.append(p);
  document.querySelector("#clearAlert")?.addEventListener("click", () => {
    document.querySelectorAll(".alert").forEach((item) => item.remove());
    cb && cb();
  });
  await dialogPolyfill.registerDialog(
    document.querySelector(".alert") as HTMLDialogElement
  );
  try {
    (document.querySelector(".alert") as HTMLDialogElement).showModal();
  } catch (e) {
    console.log(e);
  }
};
