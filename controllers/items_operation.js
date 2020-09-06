"use strict";

const { getDict,
        setDict, 
        find_available_key_in_dict,
        find_key_in_dict,
        parse_item,
        create_item,
        update_item,
        delete_item,
        check_params_is_valid,
        check_param_id } = require('./utils.js');

/* get item in the list
*/
function getItems(req, res) {
    try
    {
        let status = 500;
        let myDict = {};

        myDict = getDict("list");
        status = 200;
        return res.status(status).json({"data": {"items": myDict }})
    } catch (error)
    {
        status = 500;
        return res.status(status).json({ error: error.message })
    }
};


/* create new item in the list
 */
function createItem(req, res) {
    try
    {
        let myDict = {};
        let obj = {};
        let status = 500;
        let item = '';
        let id = 0;
        let result = false;

        myDict = getDict("list");
        item = parse_item(req.body);
        result = create_item(myDict, item, undefined);
        if (result && result !== false)
        {
            status = 201;
            id = Object.keys(result)[0];
            return res.status(status)
                    .json({"data": {"items": `item ${ id } has been created with content ${ result[id]["content"] } with status ${ (result[id]["done"]) ? "done" : "todo"}`}})
        }
        else
        {
            status = 500;
            return res.status(status).json({error : "item could not be created"});
        }
    } catch (error)
    {
        return res.status(status).json({ error: error.message})
    }
};

/* update item in list
 */
function updateItem(req, res) {
    try
    {
        let myDict = {};
        let item = '';
        let obj = {};
        let id = '';
        let result = false;
        let status = 500;
        let key = false;

        myDict = getDict("list");
        id = req.params.id
        // update need to have an id
        if (check_param_id(id) !== false)
        {
            key = find_key_in_dict(myDict, req.params.id)
            obj = parse_item(req.body)
            if (key === false)
            {
                status = 201
                result = create_item(myDict, obj, id);
            }
            else
            {
                result = update_item(myDict, obj, id)
            }
        }
        else
        {
            return res.status(status).json({error : "item could not be updated"});
        }
        if (result && result !== false)
        {
            status = (status == 201) ? status : 200;
            return res.status(status).json({"data": {"items":
                `item ${ id } has been updated with content ${ result[id]["content"] } with status ${ (result[id]["done"]) ? "done" : "todo"}` },
            });
        }
        else {
            status = 500
            return res.status(status).json({error : "item could not be updated"});
        }
    } catch (error)
    {
        return res.status(status).json({ error: error.message})
    }
}

/* delete item in the list
 */
function deleteItem(req, res) {
    try
    {
        let myDict = {};
        let status = 500;
        let result = false;
        let id = '';
    
        myDict = getDict("list");
        id = req.params.id;
        if (check_param_id(id) !== false)
        {
            if (find_key_in_dict(myDict, req.params.id) === false)
            {
                status = 204;
                return res.status(status).json({"data": {"items": "no content"}});
            }
            result = delete_item(myDict, id);
            if (result && result !== false)
            {
                status = 200;
                return res.status(status).json({"data": {"items": "item " + req.params.id + " has been deleted"}});
            }
        }
        return res.status(status).json({error : "failed to delete object"}); 
    } catch (error)
    {
        return res.status(status).json({ error: error.message})
    }
};

module.exports = { createItem,
                   deleteItem,
                   updateItem,
                   getItems}
