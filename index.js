let allIdols = [
    "Aconite",
    "Ageratum",
    "Allium",
    "Anemone",
    "Angelica",
    "Angelonia",
    "Artemisia",
    "Aster",
    "Astilbe",
    "Aubrieta",
    "Azalea",
    "Balloon Flower",
    "Balsam",
    "Baneberry",
    "Basket of Gold",
    "Bee Balm",
    "Begonia",
    "Bellflower",
    "Bergenia",
    "Blackeyed Susan",
    "Bleeding Heart",
    "Bloodroot",
    "Boneset",
    "Browallia",
    "Bugleweed",
    "Bugloss",
    "Buttercup",
    "Butterfly Weed",
    "Caladium",
    "Calendula",
    "California Poppy",
    "Canterbury Bells",
    "Cardinal Flower",
    "Carnation",
    "Castor Bean",
    "Catmint",
    "Celosia",
    "Chives",
    "Chrysanthemum",
    "Clary Sage",
    "Cleome",
    "Coleus",
    "Columbine",
    "Comfrey",
    "Coneflower",
    "Coreopsis",
    "Corydalis",
    "Cosmos",
    "Crocus",
    "Crown Imperial",
    "Cushion Spurge",
    "Cyclamen",
    "Daffodil",
    "Dahlia",
    "Daisy",
    "Dame’s Rocket",
    "Delphinium",
    "Diascia",
    "Dusty Miller",
    "Dutchman's Breeches",
    "Epimedium",
    "Evergreen Candytuft",
    "Fennel",
    "Fountain Grass",
    "Foxglove",
    "Gaillardia",
    "Gas Plant",
    "Gaura",
    "Gazania",
    "Geranium",
    "Geum",
    "Globe Thistle",
    "Glory of the Snow",
    "Goatsbeard",
    "Golden Marguerite",
    "Gomphrena",
    "Heliotrope",
    "Hepatica",
    "Hollyhock",
    "Hosta",
    "Hyacinth",
    "Hyssop",
    "Impatiens",
    "Iris",
    "Jack-in-the-Pulpit",
    "Jacob’s Ladder",
    "Lady's Mantle",
    "Lantana",
    "Lavender",
    "Lavender Cotton",
    "Leadwort",
    "Lemon Balm",
    "Lily",
    "Lobelia",
    "Lupine",
    "Maiden Pink",
    "Malva",
    "Marigold",
    "Mazus",
    "Mirabilis",
    "Moonflower",
    "Morning Glory",
    "Nasturtium",
    "Nierembergia",
    "Orchid",
    "Osteospermum",
    "Pansy",
    "Pearly Everlasting",
    "Perennial Flax",
    "Periwinkle",
    "Petunia",
    "Pincushion Flower",
    "Polka Dot Plant",
    "Primrose",
    "Ranunculus",
    "Red Valerian",
    "Rock Soapwort",
    "Rose",
    "Rue",
    "Sanvitalia",
    "Scarlet Sage",
    "Sea Lavender",
    "Sea Thrift",
    "Shirley Poppy",
    "Shooting Star",
    "Silvermound",
    "Skunk Cabbage",
    "Snapdragon",
    "Snow in Summer",
    "Snowdrop",
    "Solomon's Seal",
    "Spring Snowflake",
    "Summer Savory",
    "Sunflower",
    "Sweet Alyssum",
    "Sweet Woodruff",
    "Tansy",
    "Thunbergia",
    "Tithonia",
    "Torenia",
    "Trillium",
    "Tulip",
    "Verbena",
    "Violet",
    "Virginia Bluebell",
    "Wild Senna",
    "Windflower",
    "Yarrow",
    "Yellow Archangel",
    "Yellow Loosestrife",
    "Zinnia"
];

async function getImage(query) {
    query += " flower plant";
    console.log(`Begin getting images for ${query}`);
    var key = '7816438c1fd54554b5563f6b1db669db'; // Thay bằng API Key của bạn
  
    // Gọi API, truyền key vào header, lấy kết quả trả về dạng 
    var url = `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${query}&count=40`;
    var result = await fetch(url, {
        method: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': key
        }
    }).then(rs => rs.json());

    console.log(`Finish getting images for ${query}`);

    // Lọc bớt, chỉ lấy link thumbnail và link ảnh
    return result.value.map(vl => {
        return { thumbnail: vl.thumbnailUrl, image: vl.contentUrl };
    });
}

// Hàm tải dữ liệu về dưới dạng file .json
function downloadJson(jsonObject) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObject));
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "idols.json");
    dlAnchorElem.click();
};

// Bắt đầu chạy chương trình 
(async() => {
    let index = 1;
    let idolWithImage = [];
    var i = 0;
    // Lấy ảnh của mỗi idol trong danh sách
    for (let idol of allIdols) {

        (function(i){
            if(i >= allIdols.length){
                return;
            }
            window.setTimeout(async function(){
                var images = await getImage(idol);
                idolWithImage.push({
                    id: index++,
                    name: idol,
                    images: images
                });
                console.log("Index: " + i);
                if(i >= allIdols.length - 1){
                    console.log(idolWithImage);
                  
                    // Tải dữ liệu về dưới dạng 
                    downloadJson(idolWithImage);
                }
            }, i * 1000);

        }(i));
        i++;
    }
})();