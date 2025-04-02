
// 获取youtube视频id
export function videoUtilGetYoutubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// 获取vimeo视频id
export function videoUtilGetVimeoVideoId(url: string) {
  const regExp = /vimeo\.com\/([0-9]+)/
  const match = url.match(regExp)
  return match ? match[1] : null
}

// 获取bilibli视频id
export function videoUtilGetBilibiliVideoId(url: string) {
  const regExp = /video\/(BV[1-9A-HJ-NP-Za-km-z]{10})/
  const match = url.match(regExp)
  return match ? match[1] : null
}

// 获取视频url
export function videoUtilGetVideoUrl(url: string): { url: string, caption: string } {
  const youtubeId = videoUtilGetYoutubeVideoId(url)
  if (youtubeId) {
    return {
      url: `https://www.youtube.com/embed/${youtubeId}`,
      caption: "YouTube Video"
    }
  }

  const bilibiliId = videoUtilGetBilibiliVideoId(url)
  if (bilibiliId) {
    return {
      url: `https://player.bilibili.com/player.html?bvid=${bilibiliId}&autoplay=0`,
      caption: "Bilibili Video"
    }
  }

  const vimeoId = videoUtilGetVimeoVideoId(url)
  if (vimeoId) {
    return {
      url: `https://player.vimeo.com/video/${vimeoId}`,
      caption: "Vimeo Video"
    }
  }

  return {
    url: url,
    caption: "Video"
  }
}