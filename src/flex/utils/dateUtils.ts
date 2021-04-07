import { DateTimeFormatter, LocalDate } from "@js-joda/core";


export class DateUtils {
    
    static stringtoLocalDate(stringDate: string): LocalDate {
        const [day , month , year] = stringDate.split('/');
        return LocalDate.of(+ year, + month, + day);
    }

    static localDateToString(date: LocalDate): string {
        return date.format(DateTimeFormatter.ofPattern('dd/MM/yyyy')).toString();
    }

}