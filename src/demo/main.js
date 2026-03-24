import Handlebars from "handlebars/runtime";
import layoutTemplate from "../../templates/layout.hbs";
import themeTemplate from "../../templates/theme.hbs";
import boardTemplate from "../../templates/board.hbs";
import { registerHandlebarsHelpers } from "../shared/register-handlebars-helpers.js";

import "../../scripts/next-train.js";
import "../../scripts/scrolling.js";

window.Handlebars = Handlebars;
window.registerHandlebarsHelpers = function() {
    registerHandlebarsHelpers(Handlebars);
};
window.boardTemplates = {
    layoutTemplate: layoutTemplate,
    themeTemplate: themeTemplate,
    boardTemplate: boardTemplate
};

import("../../scripts/data.js");
