export enum Theme {
  dark,
  light,
}

export const Profile = {
  theme: Theme.light,
  setTheme(v: Theme) {
    this.theme = v;
    localStorage.setItem("theme", v.toString());
    if (v === Theme.dark)
      document.documentElement.classList.remove("dark-mode");
    else document.documentElement.classList.add("dark-mode");
  },
  getTheme(): Theme {
    const data = localStorage.getItem("theme");
    if (data === null) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? Theme.dark
        : Theme.light;
    } else {
      return Number(data);
    }
  },
};

// import(Profile.theme ? "@/assets/water/builds/light.css" : "@/assets/water/builds/dark.css");
