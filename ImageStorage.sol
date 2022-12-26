pragma solidity ^0.5.0;

contract ImageStorage {
    string public contractName;
    uint public amountOfImages;
    mapping(uint => Image) public allImages;
    
    struct Image {
        uint id;
        string cid;
        uint price;        
        bool isItForSale;
        string description;
        address payable owner;        
    }

    constructor() public {
        contractName = "Image Storage Site";
        amountOfImages = 0;
    }  

    event NewImageUploaded(
        uint id,    
        string cid,
        uint price,
        bool isItForSale,
        string description,
        address payable owner
    );   

    function uploadNewImage(string memory _cid, uint _price, string memory _desription) public {
        //Переконатися що функції передається правильний cid
        require(bytes(_cid).length == 46);
        //Переконатися що користувач зазначив
        require(_price > 0);
        //Переконатися що користувач зазначив опис
        require(bytes(_desription).length > 0);
        //Переконатися що адреса завантажувача дійсно існує
        require(msg.sender != address(0));
        //Додати лічильник зображень        
        amountOfImages++;
        //Створити нове зображення та додати його до списку
        allImages[amountOfImages] = Image(amountOfImages, _cid, _price, false, _desription, msg.sender);
        //Викликати відповідний обробник подій
        emit NewImageUploaded(amountOfImages, _cid, _price, false, _desription, msg.sender);
    }

    event soldStatusChanged(
        uint id,
        bool completed
    );

    function changeSoldStatus(uint _id) public {        
        Image memory _image = allImages[_id];
        require(msg.sender == _image.owner);
        _image.isItForSale = !_image.isItForSale;
        allImages[_id] = _image;
        emit soldStatusChanged(_id, _image.isItForSale);
    }

    event ImageDeal(
        uint id,
        string cid,
        bool isItForSale,
        address newOwner
    );

    function buyImage(uint _id) public payable {
        require(_id > 0 && _id <= amountOfImages);
        require(msg.sender != address(0));
        Image memory _image = allImages[_id];
        require(msg.sender != _image.owner);
        address payable _owner = _image.owner;
        address(_owner).transfer(msg.value);
        _image.owner = msg.sender;
        _image.isItForSale = false;
        allImages[_id] = _image;
        emit ImageDeal(_id, _image.cid, _image.isItForSale, msg.sender);
    }
}

pragma solidity ^0.5.0;

contract ImageStorage {
    //Зміна для відображення імені додатку
    string public contractName;

    //Зміна для відображення кількості картин, що були завантажені до додатку
    uint public amountOfImages;

    //Зіставлення, що зберігає пари ключ-значення, ключ представлений ідентифікатором, значення є зображенням
    mapping(uint => Image) public allImages;
    
    //Структура для зберігання інформації про нові зображення    
    struct Image {
        uint id;
        string cid;
        uint price;        
        bool isItForSale;
        string description;
        address payable owner;        
    }

    //Конструктор контракту, що викликається під час його розгорання у мережі
    constructor() public {
        contractName = "Image Storage Site";
        amountOfImages = 0;
    } 

    //Обробник подій, що викликається після успішного додавання нової картини
    event NewImageUploaded(
        uint id,    
        string cid,
        uint price,
        bool isItForSale,
        string description,
        address payable owner
    );

    //Функція для завантаження інформації про нове зображення
    function uploadNewImage(string memory _cid, uint _price, string memory _desription) public {
        //Переконатися що функції передається правильний cid
        require(bytes(_cid).length == 46);
        //Переконатися що користувач зазначив ціну
        require(_price > 0);
        //Переконатися що користувач зазначив опис
        require(bytes(_desription).length > 0);
        //Переконатися що адреса завантажувача дійсно існує
        require(msg.sender != address(0));
        //Додати лічильник зображень        
        amountOfImages++;
        //Створити нове зображення та додати його до списку
        allImages[amountOfImages] = Image(amountOfImages, _cid, _price, false, _desription, msg.sender);
        //Викликати відповідний обробник подій
        emit NewImageUploaded(amountOfImages, _cid, _price, false, _desription, msg.sender);
    }

    //Обробник подій, що викликається після успішної зміни статусу зображення
    event SoldStatusChanged(
        uint id,
        bool completed
    );

    //Функція для зміни статусу зображення
    function changeSoldStatus(uint _id) public {
        //Перевірка чи існує зображення із вказаним ідентифікатором
        require(_id > 0 && _id <= amountOfImages);
        //Отримання зображення із зіставлення
        Image memory _image = allImages[_id];
        //Змінити статус може тільки власник зображеня
        require(msg.sender == _image.owner);
        //Зміна статусу зображення на протилежне до теперішнього
        _image.isItForSale = !_image.isItForSale;
        //Оновлення зіставлення
        allImages[_id] = _image;
        //Викликати відповідний обробник подій
        emit SoldStatusChanged(_id, _image.isItForSale);
    }

    //Обробник подій, що викликається після успішної покупки зображення
    event ImageDeal(
        uint id,
        string cid,
        bool isItForSale,
        address newOwner
    );

    //Функція для покупки зображення
    function buyImage(uint _id) public payable {
        //Перевірка чи таке зображення
        require(_id > 0 && _id <= amountOfImages);
        //Чи існує адреса покупця
        require(msg.sender != address(0));
        //Отримання зображення
        Image memory _image = allImages[_id];
        //Власник не може купувати сам у себе
        require(msg.sender != _image.owner);
        //Чи дійсно зображення продається
        require(_image.isItForSale);
        //Перевірка чи сплачена вартість
        require(_image.price <= msg.value);
        //Отримання адреси власника
        address payable _owner = _image.owner;
        //Відправка грошей власнику
        address(_owner).transfer(msg.value);
        //Зміна власника
        _image.owner = msg.sender;
        //Зміна статусу зображення
        _image.isItForSale = false;
        //Оновлення зіставлення
        allImages[_id] = _image;
        //Викликати відповідний обробник подій
        emit ImageDeal(_id, _image.cid, _image.isItForSale, msg.sender);
    }
    
    //Обробник подій, що викликається після успішної зміни ціни
    event PriceChanged(
        uint id,
        uint price
    );

    //Функція для зміни ціни на зображення
    function changePrice(uint _id, uint _price) public {
        //Перевірка чи вказав користувач нову ціну
        require(_price > 0);
        //Перевірка чи є зображення із вказаним ідентифікатором
        require(_id > 0 && _id <= amountOfImages);
        //Отримання зображення  
        Image memory _image = allImages[_id];
        //Тільки власник може змінювати ціну
        require(msg.sender == _image.owner);
        //Зміна ціни
        _image.price = _price;
        //Оновлення зіставлення
        allImages[_id] = _image;
        //Викликати відповідний обробник подій
        emit PriceChanged(_id, _price);
    }

    //Обробник подій, що викликається після успішної зміни опису
    event DescriptionChanged(
        uint id,
        string description
    );

    //Функція для зміни опису зображення
    function changeDescription(uint _id, string memory _description) public {
        //Перевірка чи вказав користувач новий опис
        require(bytes(_description).length > 0);
        //Перевірка чи є зображення із вказаним ідентифікатором
        require(_id > 0 && _id <= amountOfImages);
        //Отримання зображення              
        Image memory _image = allImages[_id];
        //Тільки власник може змінювати опис
        require(msg.sender == _image.owner);
        //Зміна опису
        _image.description = _description;
        //Оновлення зіставлення
        allImages[_id] = _image;
        //Викликати відповідний обробник подій
        emit DescriptionChanged(_id, _description);
    }
}