export class Utils {
  generateTitle(url: string): string {
    let url_split = url.split('/');
    let menuSlice = url_split.slice(2);
    return menuSlice.map(m => m.replace(/-/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")).join(" / ");
  }
}

