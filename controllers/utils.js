"use strict";

const nodecache = require('node-cache');
const _ = require('lodash');
const cache = new nodecache({checkperiod:0, sslTTL: 0});

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
** body:
**      check if body has arguments content and done
** obj can have one or multiple keys (content, done)or empty.
*/
function parse_item(body)
{
    let obj = {}

    if (body.content && check_params_is_valid(body.content) !== false)
    {
        obj["content"] = body.content
    }
    if (typeof body.done !== 'undefined')
    {
        obj["done"] = body.done
    }
    return obj
}

/*
** myDict:
**      object that has to be save in cache
**      contain all items in list
** id:
**      item id that will be deleted
*/
function delete_item(myDict, id)
{
    let result = false;

    delete myDict[id];
    result = setDict("list", myDict);
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
    result = setDict("list", myDict);
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
    result = setDict("list", myDict);
    if (result !== false)
    {
        return id, obj
    }
    return false;
}

function find_available_key_in_dict(myDict)
{
    for (let i = 0; i <= 100000; i++)
    {
        if (myDict.hasOwnProperty(i) === true)
        {
            continue
        }
        else
        {
            return i
        }
    }
}

function find_key_in_dict(myDict, key)
{
    if (myDict.hasOwnProperty(key) === true)
    {
        return key;
    }
    else
    {
        return false
    }
}

function check_params_is_valid(param)
{
    if (typeof param == 'string' || param instanceof String)
    {

        if (param.length > 0)
        {
            return param
        }
    }
    return false
}

function check_param_id(param)
{
    var test_number;
    var sign;

    test_number = Number(param);
    if (test_number >= 100000)
        return false
    sign = Math.sign(test_number);
    if (test_number != NaN && sign >= 0)
    {
        return param
    }
    return false
}

module.exports = { getDict,
                   setDict,
                   find_available_key_in_dict,
                   find_key_in_dict,
                   check_params_is_valid,
                   check_param_id,
                   flushAll,
                   create_item,
                   update_item,
                   delete_item,
                   parse_item
               }
