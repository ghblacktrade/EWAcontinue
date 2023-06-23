"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const word_controller_1 = __importDefault(require("./controllers/word.controller"));
const app = (0, express_1.default)();
const port = 3000;
//template engine
app.set('view engine', 'pug');
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rusWord = req.body.russian;
    const engWord = yield (0, word_controller_1.default)(rusWord);
    res.render('result', { engWord });
}));
// app.get('/', (req: Request, res: Response) => {
//     res.send('hi, my test thesaurus')
// })
app.listen(port, () => {
    console.log('start pasha server');
});
