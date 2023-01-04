import dialogPolyfill from "dialog-polyfill";

window.alert = async (text, cb?) => {
  const p = document.createElement("dialog");
  p.classList.add("alert");
  const content = `
    <header>通知</header>
    <p class="pt-2 pb-4 whitespace-pre-line">${text}</p>
    <p class="space-x-2  flex justify-center min-w-[200px]">
      <button id="clearAlert">确认</button>
    </p>
  `;
  p.innerHTML = content;
  document.body.append(p);
  document.querySelector("#clearAlert")?.addEventListener("click", () => {
    document.querySelectorAll(".alert").forEach((item) => item.remove());
    cb && cb();
  });
  await dialogPolyfill.registerDialog(
    document.querySelector(".alert") as HTMLDialogElement
  );
  try {
    document.querySelector(".alert")?.showModal();
  } catch (e) {}
};
