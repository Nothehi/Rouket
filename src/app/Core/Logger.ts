import { settings } from '../../config';

export class Logger {

    private static color: any = require('colors');;

    public static seperator: string = ' - ';

    public static message(text: string) {
        if (settings.log_status) {
            console.log(this.getTime() + text);
        }

        return this;
    }

    private static getTime() {
        let date = new Date;
        let hours = date.getHours();
        let minutes: String | Number = date.getMinutes();
        let seconds: String | Number = date.getSeconds();

        let ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

        return this.wrapTime(strTime);
    }

    private static wrapTime(time: String) {
        return this.color.cyan('[' + time + ']') + this.seperator;
    }
}