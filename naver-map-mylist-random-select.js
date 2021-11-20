

const naverListShareAddress =
// args.plainTexts[0]
"http://naver.me/5whaH5Sw"
;

console.log(naverListShareAddress)

const naverRedirectRequest = new Request(naverListShareAddress)

const naverRedirectResponse = await naverRedirectRequest.loadString()

console.log(naverRedirectResponse)
const naverRedirectAddress = naverRedirectResponse.split('<meta data-react-helmet="true" property="og:url" content="')[1].split("?")[0]


const naverListRequest = new Request(naverRedirectAddress)

const naverListResponse = await naverListRequest.loadString()

const naverListId = naverListResponse.split('<meta data-react-helmet="true" property="twitter:url" content="https://m.place.naver.com/my/place/detailList/')[1].split("\"")[0]

console.log(naverListId)



const naverBookmarkURL = 'https://m.place.naver.com/my/graphql';

const naverBookmarkHeaders = {
    "accept": "*/*",
    "content-type": "application/json",
    "Referer": "https://m.place.naver.com/my/place/detailList/"
+naverListId
+"?external=true",
    "Referrer-Policy": "unsafe-url"
  };
  
const naverBookmarkBody = "{\"operationName\":\"FolderShared\",\"variables\":{\"shareId\":\""+naverListId+"\",\"start\":0,\"limit\":10},\"query\":\"query FolderShared($shareId: String, $sort: String, $start: Int, $limit: Int, $skip: Boolean) {\\n  folderShared(shareId: $shareId, sort: $sort, start: $start, limit: $limit, skip: $skip) {\\n    bookmarkCount\\n    externalLink\\n    folderId\\n    followCount\\n    followId\\n    isDefaultFolder\\n    isMine\\n    isSaved\\n    markerColor\\n    memo\\n    name\\n    publicationStatus\\n    removed\\n    shareId\\n    viewCount\\n    author {\\n      nickname\\n      imageUrl\\n      objectId\\n      __typename\\n    }\\n    bookmarks {\\n      address\\n      category\\n      creationTime\\n      id\\n      jibun\\n      latitude\\n      longitude\\n      memo\\n      name\\n      placeId\\n      removed\\n      reviewCount\\n      thumbnailUrl\\n      thumbnailUrls\\n      type\\n      url\\n      promotion {\\n        ...PromotionInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    places {\\n      address\\n      bookmarkId\\n      category\\n      creationTime\\n      id\\n      latitude\\n      longitude\\n      memo\\n      name\\n      removed\\n      reviewCount\\n      thumbnailUrl\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment PromotionInfo on Promotion {\\n  desc\\n  isImpPeriod\\n  isEventPeriod\\n  impStartDate\\n  impEndDate\\n  eventStartDate\\n  eventEndDate\\n  __typename\\n}\\n\"}";

let naverBookmarkRequest = new Request(naverBookmarkURL);

naverBookmarkRequest.method = "POST";
naverBookmarkRequest.headers = naverBookmarkHeaders;

naverBookmarkRequest.body = naverBookmarkBody;

let naverBookmarkResponse = await naverBookmarkRequest.loadJSON();

let bookmarkArray = naverBookmarkResponse.data.folderShared.bookmarks;

bookmarkArray = 
bookmarkArray.map(bookmark => {
  return {
    "name":bookmark.name,
    "address":bookmark.address,
    "url":"https://nmap.place.naver.com/launchApp/route?path=route&type=place"  
      +"&dlat="+bookmark.latitude
      +"&dlng="+bookmark.longitude
      +"&did="+bookmark.id  
      +"&dname="+encodeURIComponent(bookmark.name)
// +"&appname=https%3A%2F%2Fm.place.naver.com%2Frestaurant%2F1291053556%2Fhome"
  }
})

"https://m.map.naver.com/appLink.naver?app=Y&version=2&appMenu=location&menu=location&pinType=site&pinId=1291053556&lat=37.5602013&lng=126.9829327&title=스타벅스%20별다방점#applink"


console.log(bookmarkArray)

const choice = Math.floor(Math.random() * bookmarkArray.length);

console.log(choice);

Safari.open(bookmarkArray[choice].url)



