"use strict";

const { parse_list, check_param_name} = require('../tools/utils.js');
const { getDict, create_list, get_lists, delete_list } = require('../models/data_model.js');

/* create list /lists
**/
function createList(req, res) {
    try
    {
        let status = 500;
        let item = {};
        let result = false;
        let lists = [];

        item = parse_list(req.body);
        if (item === false)
        {
            return res.status(status).json({error : "List name need to have only alpha characters"});
        }
        lists = get_lists();
        if ((lists.includes(item["list_name"]) === true || getDict(item["list_name"]) === false))
        {
            return res.status(status).json({error : "List name already exists"});
        }
        result = create_list(item["list_name"]);
        if (result && result !== false)
        {
            status = 201;
            return res.status(status)
                    .json({"data": {"lists": `list ${ item["list_name"] } has been created`}})
        }
        return res.status(status).json({error : "List could not be created"});
    } catch (error)
    {
        return res.status(500).json({ error: error.message})
    }
}

function getAllLists(req, res) {
    try
    {
        let status = 500;
        let lists = [];

        lists = get_lists()
        status = 200;
        return res.status(status).json({"data": {"lists": lists }})
    } catch (error)
    {
        status = 500;
        return res.status(500).json({ error: error.message})
    }
}

/* create list /lists
**/
function deleteList(req, res) {
    try
    {
        let myDict = {};
        let status = 500;
        let result = false;
        let name = '';
        let lists = [];

        name = req.params.name
        if (check_param_name(name) === true)
        {
            lists = get_lists()
            if (lists.includes(name) === false)
            {
                status = 204;
                return res.status(status).json({"data": {"lists": "no content"}});
            }
            result = delete_list(name);
            if (result && result !== false)
            {
                status = 200;
                return res.status(status).json({"data": {"lists": "list " + name + " has been deleted"}});
            }
        }
        return res.status(status).json({error : "failed to delete object"}); 
    } catch (error)
    {
        return res.status(500).json({ error: error.message})
    }
}

module.exports = {  createList,
                    getAllLists,
                    deleteList}