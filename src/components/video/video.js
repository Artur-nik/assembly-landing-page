import { videoYoutube } from "./videoYoutube"
import { parseData } from "../../js/utility/parseData";

$('[data-video]').each((index, $root)=> {
    const config = parseData($($root).data('config'))
    if ($($root).data('video').trim() === 'youtube') videoYoutube($root, config, index)
})