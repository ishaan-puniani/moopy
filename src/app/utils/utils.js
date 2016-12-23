/**
 * Created by ishaan.puniani on 2016-12-23.
 */

export function moodCssClassForColor(moodscore){
    if(moodscore < 33){
        return "danger";
    } else if(moodscore > 33 && moodscore < 66){
        return "warning"
    } else {
        return "success";
    }
};