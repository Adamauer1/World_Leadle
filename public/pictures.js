export const PICTURES = [
    ['Wilhelm II', 'King', 'German', 'Europe', '19th Century,\n20 Century', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Kaiser_Wilhelm_II_of_Germany_-_1902%28cropped%29.jpg/220px-Kaiser_Wilhelm_II_of_Germany_-_1902%28cropped%29.jpg', 'https://en.wikipedia.org/wiki/Wilhelm_II,_German_Emperor'],
    ['Nicholas II', 'King', 'Russian', 'Europe', '19th Century,\n20 Century', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Mikola_II_%28cropped%29-2.jpg/220px-Mikola_II_%28cropped%29-2.jpg', 'https://en.wikipedia.org/wiki/Nicholas_II_of_Russia'],
    ['George V', 'King', 'English', 'Europe', '20th Century', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/King_George_1923_LCCN2014715558_%28cropped%29.jpg/220px-King_George_1923_LCCN2014715558_%28cropped%29.jpg', 'https://en.wikipedia.org/wiki/George_V']
    
]


const first = {name: "Wilhelm II", title: "King", nationality: "German",
            continent: "Europe", timePeriod: ["19th Century", "20th Century"],
            picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Kaiser_Wilhelm_II_of_Germany_-_1902%28cropped%29.jpg/220px-Kaiser_Wilhelm_II_of_Germany_-_1902%28cropped%29.jpg",
            wikiURL: "https://en.wikipedia.org/wiki/Wilhelm_II,_German_Emperor"};

const second = {name: "Nicholas II", title: "King", nationality: "Russian",
            continent: "Asia", timePeriod: ["19th Century", "20th Century"],
            picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Mikola_II_%28cropped%29-2.jpg/220px-Mikola_II_%28cropped%29-2.jpg",
            wikiURL: "https://en.wikipedia.org/wiki/Nicholas_II_of_Russia"};

const third = {name: "George V", title: "King", nationality: "English",
            continent: "Europe", timePeriod: ["20th Century"],
            picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/King_George_1923_LCCN2014715558_%28cropped%29.jpg/220px-King_George_1923_LCCN2014715558_%28cropped%29.jpg",
            wikiURL: "https://en.wikipedia.org/wiki/George_V"};


export const LEADERS = new Map([['Wilhelm II', first], ['Nicholas II', second], ['George V', third]]);

export const LEADERS_LIST = ["Wilhelm II", "Nicholas II", "George V"];
