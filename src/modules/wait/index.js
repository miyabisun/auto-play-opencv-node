const assertTemplate = require("../../functions/assert-template");
const all1 = require("./all1");
const any1 = require("./any1");
const check = require("./check");
const cond = require("./cond");
const cond1 = require("./cond1");
const filter1 = require("./filter1");
const find = require("./find");
const find1 = require("./find1");
const is1 = require("./is1");
const match = require("./match");
const match1 = require("./match1");
const map1 = require("./map1");
const max1 = require("./max1");
const none1 = require("./none1");
const time = require("./time");
const tap = require("./tap");
const tap1 = require("./tap1");

module.exports = (screen, templates, verbose = false) => {
  const cache = {};
  const modules = {
    screen, templates, verbose,
    snap: async () => screen.snap(),
    check: async template => check(screen, templates, template),
    assert: template => assertTemplate(templates, template),
  };
  return {
    all1: async (templateList, refresh = true) =>
      all1(modules, templateList, refresh),
    any1: async (templateList, refresh = true) =>
      any1(modules, templateList, refresh),
    cond: async conditions =>
      cond(modules, conditions),
    cond1: async (conditions, refresh = true) =>
      cond1(modules, conditions, refresh),
    filter1: async (templateList, refresh = true) =>
      filter1(modules, templateList, refresh),
    find: async templateList =>
      find(modules, templateList),
    find1: async (templateList, refresh = true) =>
      find1(modules, templateList, refresh),
    is1: async (template, refresh = true) =>
      is1(modules, template, refresh),
    map1: async (templateList, refresh = true) =>
      map1(modules, templateList, refresh),
    max1: async (templateList, refresh = true) =>
      max1(modules, templateList, refresh),
    match: async template =>
      match(modules, template),
    match1: async (template, refresh = true) =>
      match1(modules, template, refresh),
    none1: async (templateList, refresh = true) =>
      none1(modules, templateList, refresh),
    time: async ms =>
      time(ms, verbose),
    tap: async template =>
      tap(modules, template),
    tap1: async (template, refresh = true) =>
      tap1(modules, template, refresh),
    tapc: async template =>
      tap(modules, template, cache),
  }
};
