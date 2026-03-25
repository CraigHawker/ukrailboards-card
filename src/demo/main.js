import Handlebars from "handlebars/runtime";
import layoutTemplate from "../../templates/layout.hbs";
import themeTemplate from "../../templates/theme.hbs";
import boardTemplate from "../../templates/board.hbs";
import { registerHandlebarsHelpers } from "../shared/register-handlebars-helpers.js";
import { registerDocumentBoards } from "../../scripts/next-train.js";
import { registerDocumentScrolling } from "../../scripts/scrolling.js";

window.Handlebars = Handlebars;
window.registerHandlebarsHelpers = function() {
    registerHandlebarsHelpers(Handlebars);
};
window.boardTemplates = {
    layoutTemplate: layoutTemplate,
    themeTemplate: themeTemplate,
    boardTemplate: boardTemplate
};

registerDocumentBoards(document);
registerDocumentScrolling(document);

import("../../scripts/data.js");
