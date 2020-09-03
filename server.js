const express = require('express');
const nodecache = require('node-cache');
const cache = new nodecache({checkperiod:0, sslTTL: 0});
const app = express();
const bodyParser = require('body-parser'); 
const port = process.env.PORT || 3000;
const path = require('path');
const methodOverride = require('method-override');

// override with POST having ?_method=PUT
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function getDict(name) {
    let myDict = {};

    myDict = cache.get(name);
    if (myDict == undefined) {
        myDict = {};
    }
    return myDict;
}

function find_available_key_in_dict(myDict)
{
	for (i = 0; i <= 100000; i++)
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

	test_number = Number(param);
	if (test_number != NaN && Math.sign(test_number))
	{
		if (Math.sign(test_number) != -1)
		{
			return param
		}
	}
	return false
}

/* get list of item
 */
app.get('/todo', (req, res) => {
        myDict = getDict("list");
        res.render('list.ejs', {todolist: myDict});
});

/* create new item in the list
 */
app.post('/todo/create/',  (req, res) => {
    try
    {
    	let myDict = {};
    	let id = 0;
    	let obj = {};
    	let status = 500;

    	myDict = getDict("list");
    	if (typeof req.body.create_item == 'string' || req.body.create_item instanceof String)
    	{
    		item = req.body.create_item
    	    id = find_available_key_in_dict(myDict)
    	    obj[id] = item;
    		myDict = {...myDict, ...obj};
    	}
    	else
    	{
    		return res.status(status).json({error : "item could not be created"});
    	}
    	const success = cache.set("list", myDict, 10000);
    	if (success == true)
    	{
    		status = 201;
    		return res.status(status).json({"data": {"item": "item ID: " + id + " has been created with content " + item}})
    	}
    	return res.status(status).json({error : "item could not be created"});
    } catch (error)
    {
    	return res.status(status).json({ error: error.message})
    }
});

/* update 
 */
app.put('/todo/update/:id',  (req, res) => {
    try
    {
    	let myDict = {};
    	let item;
    	let founded_id;
    	let obj = {};
    	let id = 0;
    	let success = false;
    	let status = 500;

    	myDict = getDict("list");
    	founded_id = find_key_in_dict(myDict, req.params.id)
    	if (check_params_is_valid(req.body.item_content) &&
    		check_param_id(req.params.id))
    	{
    		item = req.body.item_content
    		id = req.params.id
			if (find_key_in_dict(myDict, req.params.id) === false)
			{
				status = 201
			}
    		obj[id] = item
    		myDict = {...myDict, ...obj};
    	}
    	else
    	{
    		return res.status(status).json({error : "item could not be updated"});
    	}
    	success = cache.set("list", myDict, 10000);
    	if (success == true)
    	{
    		status = (status == 201) ? status : 200;
    		return res.status(status).json({"data": {"item": "item ID: " + id + " has been updated with content " + item}});
    	}
    	return res.status(status).json({error : "item could not be updated"});
    } catch (error)
    {
    	return res.status(status).json({ error: error.message})
    }
});

/* delete item in the list
 */
app.delete('/todo/delete/:id', (req, res) => {
	try
	{
		let myDict = {};
		let status = 500;
	
		myDict = getDict("list");
		if (check_param_id(req.params.id))
		{
			if (find_key_in_dict(myDict, req.params.id) === false)
			{
				status = 204;
				return res.status(status).json({"data": {"item": "no content"}});
			}
			delete myDict[req.params.id]
	        success = cache.set("list", myDict, 10000);
	        if (success == true)
	        {
	        	status = 200;
            	return res.status(status).json({"data": {"item": "item ID: " + req.params.id + " has been deleted"}});
			}
			return res.status(status).json({error : "failed to delete object"}); 
		}
	} catch (error)
    {
    	return res.status(status).json({ error: error.message})
    }
});

const server = app.listen(port, () => {
	console.log(`Start server listening at http://localhost:${port}`)
});

module.exports = { server, cache }
