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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var express_1 = __importDefault(require("express"));
require('dotenv').config();
var app = express_1.default();
app.get('/', function (req, res) {
    console.log('Keeping Server alive!!');
    res.status(200).json({ message: 'Hello' });
});
app.listen(Number(process.env.PORT) || 3000, function () {
    console.log("Listening at PORT " + process.env.PORT);
});
var client = new discord_js_1.Client({
    partials: ['MESSAGE', 'REACTION'],
});
var webhookClient = new discord_js_1.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);
var PREFIX = '$';
client.on('ready', function () {
    var _a;
    console.log(((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag) + " has logged in.");
});
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, CMD_NAME, args, member, user, err_1, msg;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (message.author.bot)
                    return [2 /*return*/];
                if ((client.user && message.mentions.has(client.user)) ||
                    (message.content.match(/(^hi|^hello|^hey)/i) &&
                        message.channel.type === 'dm')) {
                    message.reply("Hi " + message.author.username + ", What's up!!!").catch(function (err) {
                        message.reply("Sorry!! :( Something went wrong. Please try again!!");
                    });
                }
                if (!message.content.startsWith(PREFIX)) return [3 /*break*/, 7];
                _a = message.content
                    .trim()
                    .substring(PREFIX.length)
                    .split(/\s+/), CMD_NAME = _a[0], args = _a.slice(1);
                if (!(CMD_NAME === 'kick' && message.member)) return [3 /*break*/, 1];
                if (!message.member.hasPermission('KICK_MEMBERS'))
                    return [2 /*return*/, message.reply('You do not have permissions to use that command')];
                if (args.length === 0)
                    return [2 /*return*/, message.reply('Please provide an ID')];
                member = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.get(args[0]);
                if (member) {
                    member
                        .kick()
                        .then(function (member) { return message.channel.send(member + " was kicked."); })
                        .catch(function (err) {
                        console.log(err);
                        message.channel.send('I cannot kick that user :(');
                    });
                }
                else {
                    message.channel.send('That member was not found');
                }
                return [3 /*break*/, 7];
            case 1:
                if (!(CMD_NAME === 'ban' && message.member)) return [3 /*break*/, 6];
                if (!message.member.hasPermission('BAN_MEMBERS'))
                    return [2 /*return*/, message.reply('You do not have permissions to use that command')];
                if (args.length === 0)
                    return [2 /*return*/, message.reply('Please provide an ID')];
                _d.label = 2;
            case 2:
                _d.trys.push([2, 4, , 5]);
                return [4 /*yield*/, ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.ban(args[0]))];
            case 3:
                user = _d.sent();
                message.channel.send('User was banned successfully');
                return [3 /*break*/, 5];
            case 4:
                err_1 = _d.sent();
                console.log(err_1);
                message.channel.send('An error occured. Either I do not have permissions or the user was not found');
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                if (CMD_NAME === 'announce') {
                    console.log(args);
                    msg = args.join(' ');
                    console.log(msg);
                    webhookClient.send(msg);
                }
                _d.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
client.on('messageReactionAdd', function (reaction, user) {
    var _a;
    var name = reaction.emoji.name;
    var member = (_a = reaction.message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(user.id);
    if (!member)
        return;
    if (reaction.message.id === '738666523408990258') {
        switch (name) {
            case '🍎':
                member.roles.add('738664659103776818');
                break;
            case '🍌':
                member.roles.add('738664632838782998');
                break;
            case '🍇':
                member.roles.add('738664618511171634');
                break;
            case '🍑':
                member.roles.add('738664590178779167');
                break;
        }
    }
});
client.on('messageReactionRemove', function (reaction, user) {
    var _a;
    var name = reaction.emoji.name;
    var member = (_a = reaction.message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(user.id);
    if (!member)
        return;
    if (reaction.message.id === '738666523408990258') {
        switch (name) {
            case '🍎':
                member.roles.remove('738664659103776818');
                break;
            case '🍌':
                member.roles.remove('738664632838782998');
                break;
            case '🍇':
                member.roles.remove('738664618511171634');
                break;
            case '🍑':
                member.roles.remove('738664590178779167');
                break;
        }
    }
});
client.login(process.env.DISCORD_TOKEN);
