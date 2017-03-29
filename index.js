module.exports.rules = {
    "localstorage": {
    	meta: {
	        docs: {
	            description: "Do not access local storage directly"
	        },
	        fixable: "code"
	    },
	    create(context) {
	        return {
	            MemberExpression: function check(node) {
	            	if (node.object.name === 'localStorage'){
	            		if (node.property.name !== 'getItem' && node.property.name !== 'setItem')
	            			context.report({
	            				node,
	            				message: "Do not access local storage directly",
	            				fix(fixer) {
	            					let parent = node.parent;
	            					if (parent.type === 'AssignmentExpression' && parent.right === node)
	            						return fixer.replaceText(node.property, "getItem('"+node.property.name+"')")
	            				}
	            			});
            		}
	     		}
	        };
	    }
	}
};