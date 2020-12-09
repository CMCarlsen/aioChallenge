import * as Colors from '@material-ui/core/colors/';

export default class ColorTool {
  darkColorArray: string[]
  constructor() {
    this.darkColorArray = [];

    Object.entries(Colors).forEach(
      ([k, v]) => {
        if (k !== 'common') {
          const color: any = v;
          this.darkColorArray.push(color[900]);
        }
      }
    );
  }

  public getDarkColor(): string {
    const randNum = Math.floor(Math.random() * (this.darkColorArray.length));
    return this.darkColorArray[randNum];
  }
}
