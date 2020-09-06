"use strict";

/*
** body:
**      check if body has arguments content and done
** obj can have one or multiple keys (content, done)or empty.
*/
function parse_item(body)
{
    let obj = {}

    if (check_param_name(body.list) === true)
    {
        obj["list"] = body.list
    }
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
** name:
**      check the name is string and contain only alpha characters
**      before assign
*/
function check_param_name(name)
{
	var regexp = /^[A-Za-z]+$/;

	if (name && check_params_is_valid(name) !== false)
	{
        if (regexp.test(name) === true)
        {
        	return true
        }
	}
	return false
}


/*
** body:
**      list_name name of the list, verify that contain only alpha characters
**      before assign
*/
function parse_list(body)
{
    let obj = {}
    var regexp = /^[A-Za-z]+$/;

    if (check_param_name(body.list_name) === true)
    {
    	obj["list_name"] = body.list_name
    	return obj
    }
    return false
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

module.exports = { 
				   parse_item,
				   find_available_key_in_dict,
                   find_key_in_dict,
                   check_params_is_valid,
                   check_param_id,
                   check_param_name,
                   parse_list,
               }
