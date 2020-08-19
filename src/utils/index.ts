//全屏
export const fullScreen = () => {
  var element = document.documentElement;
  if (element.requestFullscreen) {
      element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
  }
}

//退出全屏 
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  }
}


/*
 * 设置setLocalStorage
 * */
export function setLocalStorage(key:string, value:any):void {
    window.localStorage.setItem(key, window.JSON.stringify(value));
  }
  /*
   * 获取getLocalStorage
   * */
  export function getLocalStorage(key:string):any {
    return window.JSON.parse(window.localStorage.getItem(key) || "[]");
  }
  /*
   * 设置setSessionStorage
   * */
  export function setSessionStorage(key:string, value:any):void {
    window.sessionStorage.setItem(key, window.JSON.stringify(value));
  }
  /*
   * 获取getSessionStorage
   * */
  export function getSessionStorage(key:string):any {
    return window.JSON.parse(window.sessionStorage.getItem(key) || "[]");
  }
  