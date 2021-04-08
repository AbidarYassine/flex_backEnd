import { LocalTime } from "@js-joda/core";

export class TimeUtils {

    static stringToLocalTime(stringTime: string): LocalTime {
        return LocalTime.parse(stringTime);
    }

    static localTimeToString(time: LocalTime): string {
        return `${time.hour()}:${time.minute()}`;
    }

}