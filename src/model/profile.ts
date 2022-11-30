export enum Theme {
  dark = "d",
  light = "l",
}

export const Profile = {
  theme: Theme.light,
  setTheme(v: Theme) {
    this.theme = v;
    localStorage.setItem("theme", v);
    if (v === Theme.dark) document.documentElement.classList.add("dark-mode");
    else document.documentElement.classList.remove("dark-mode");
  },
  getTheme() {
    const data =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? Theme.dark
        : Theme.light);
    this.theme = data as Theme;
    return this.theme;
  },
  autoTheme() {
    const data = this.getTheme();
    if (data === Theme.dark)
      document.documentElement.classList.add("dark-mode");
    else document.documentElement.classList.remove("dark-mode");
  },
};
