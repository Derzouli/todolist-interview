"use strict"

const nodecache = require('node-cache');
const _ = require('lodash');
const cache = new nodecache({checkperiod:0, sslTTL: 0});

const { find_available_key_in_dict } = require('../tools/utils.js');

function list_keys()
{
	return cache.keys();
}

function get_lists() {
	let allLists = [];

	allLists = cache.get('_lists');
	if (allLists == undefined) {
		allLists = [];
	}
	return allLists;
}

function flushAll() {
    cache.flushAll();
}

function getDict(key) {
    let myDict = {};

    myDict = cache.get(key);
    if (myDict == undefined) {
        myDict = {};
    }
    return myDict;
}

function find_name() {
	list.includes(name)
}

function create_list(name) {
	let allLists = [];
	
	allLists = get_lists();
	allLists.push(name);
	allLists = setDict("_lists", allLists);
	if (allLists && allLists !== undefined)
	{
		return setDict(name, {});
	}
	return false;
}

function delete_list(name) {
	let allLists = [];
	let entries_deleted = 0;
	
	allLists = get_lists();
	const index = allLists.indexOf(name);
	if (index > -1)
	{
		allLists.splice(index, 1);
	}
	entries_deleted = cache.del(name);
	allLists = setDict("_lists", allLists);
	if (allLists && allLists !== undefined)
	{
		return true;
	}
	return false;
}

/*
** setDict:
**      object that has to be save in cache
**      key is the name of the list
**      except for _lists that contains all name of list
** key:
**      name of the list : String
**      except for _lists that contains all name of list
** value:
**      item object to be saved in the list
** a la fin il doit get lobject de la db
*/
function setDict(key, value) {
    let result = false;

    result = cache.set(key, value, 10000);
    return ((result === true) ? value : false);
}
/*
** myDict:
**      object that has to be save in cache
**      contain all items in list
** id:
**      item id that will be deleted
*/
function delete_item(myDict, id, list_name)
{
    let result = false;

    delete myDict[id];
    result = setDict(list_name, myDict);
    return result;
}

/*
** myDict:
**      object that has to be save in cache
**      contain all items in list
** new value:
**      new item to be saved
** id:
**      item id
** return obj that have been saved or false
*/
function update_item(myDict, new_item, id)
{
    let obj = {};
    let result = false;

    obj[id] = {}
    obj[id]["content"] = (new_item["content"] !== undefined) ? new_item["content"] : myDict[id]["content"];
    obj[id]["done"] = (new_item["done"] !== undefined) ? new_item["done"] : myDict[id]["done"];
    myDict[id] = obj[id];
    result = setDict(new_item["list"], myDict);
    if (result !== false)
    {
        return obj
    }
    return false;
}

/*
** myDict:
**      object that has to be save in cache
**      contain all items in list
** item_content:
**      content: String
**      done: Boolean
** id:
**      item id
** return obj that have been saved or false
*/
function create_item(myDict, item_content, id)
{
    let obj = {};
    let result = false;

    id = (id) ? id : find_available_key_in_dict(myDict);
    obj[id] = {}
    if (item_content.hasOwnProperty("content"))
    {
        obj[id]["content"] = item_content["content"]
    }
    else
    {
        return false
    }
    if (item_content.hasOwnProperty("done"))
    {
        obj[id]["done"] = item_content["done"]
    }
    else
    {
        obj[id]["done"] = false
    }
    myDict = {...myDict, ...obj};
    result = setDict(item_content["list"], myDict);
    if (result !== false)
    {
        return id, obj
    }
    return false;
}

module.exports = { getDict,
                   setDict,
                   flushAll,
                   list_keys,
                   create_item,
                   update_item,
                   delete_item,
                   create_list,
                   delete_list,
                   get_lists
               }
