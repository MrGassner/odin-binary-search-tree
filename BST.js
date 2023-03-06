class Node {
    constructor(d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

var root = null;

function arrSorter(arr) {
    let newArr = [...new Set(arr)]
    
    newArr.sort((a, b) => a - b)
    return newArr
}

function sortedArrayToBST(arr, start, end) {
    if (start > end) return null

    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = sortedArrayToBST(arr, start , mid - 1);
    node.right = sortedArrayToBST(arr, mid + 1, end);
    return node
}

function insert(key) {
    root = insertRec(root, key);
}

function insertRec(root, key) {
    if (root === null) {
        root = new Node(key);
        return root;
    }

    if (key < root.data) {
        root.left = insertRec(root.left, key)
    } else {
        root.right = insertRec(root.right, key)
    }
    return root
}

function deleteKey(key) {
    root = deleteRec(root, key)
}

function deleteRec(root, key) {
    if (root == null) return root;

    if (key < root.data) {
        root.left = deleteRec(root.left, key);
    } else if (key > root.data) {
        root.right = deleteRec(root.right, key);
    } else {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;          

        root.data = minValue(root.right);
        root.right = deleteRec(root.right, root.data);
    }
    return root;
}

function findMinHeight(root) {
    if (root === null) return -1;

    let left = findMinHeight(root.left);
    let right = findMinHeight(root.right);
    if (left < right) {
        return left + 1
    } else {
        return right + 1
    }
};

function findMaxHeight(root) {
    if (root === null) return -1;

    let left = findMaxHeight(root.left);
    let right = findMaxHeight(root.right);
    if (left > right) {
        return left + 1
    } else {
        return right + 1
    }
}

function isBalanced(root) {
    return console.log(findMinHeight(root) >= findMaxHeight(root) - 1)
}

function minValue(root) {
    console.log(root)
    let minv = root.data;
    while (root.left !== null) {
        minv = root.left.data;
        root = root.left
    }
    return minv;
}

function find(root, key) {
    if (root === null || root.data === key) return prettyPrint(root)
    if (root.data < key) return find(root.right, key)
    return find(root.left, key)
}

function findHeightUtil(root, key) {
    if (root === null) return -1;

    let leftHeight = findHeightUtil(root.left, key);
    let rightHeight = findHeightUtil(root.right, key);
    let curr = Math.max(leftHeight, rightHeight) + 1;

    if (root.data === key) height = curr;

    return curr
}

function findHeight(root, key) {
    findHeightUtil(root, key)

    return console.log(height)
}

function findDepth(root, key) {
    if (root === null) return -1;

    let dist = -1;
    if ((root.data === key) ||
        (dist = findDepth(root.left, key)) >= 0 ||
        (dist = findDepth(root.right, key)) >= 0) 
        
        return dist + 1
        
        if (root.data === key) console.log(`depth: ${dist}`);
        else console.log(root.data, key)

    return dist
}

function levelOrder(root) {
    if (root === null) return root;

    const result = []
    const queue = [ root ]

    while (queue.length) {
        const levelSize = queue.length
        const currentLevel = []

        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()
            currentLevel.push(currentNode.data)
            if (currentNode.left) {
                queue.push(currentNode.left)
            } 
            if (currentNode.right) {
                queue.push(currentNode.right)
            }
        }
        result.push(currentLevel)
    }
    return console.log(result)
}

function depthFirst(root) {
    if (root === null) return root;
    const stack = [ root ];

    while (stack.length) {
        const current = stack.pop();
        console.log(current.data)

        if (current.right) stack.push(current.right);
        if (current.left) stack.push(current.left);
    }
}

function preOrder(root) {
    if (root === null) return root;

    console.log(root.data);
    preOrder(root.left);
    preOrder(root.right);
}

function postOrder(root) {
    if (root === null) return root;

    postOrder(root.left);
    postOrder(root.right);
    console.log(root.data);
}

function inOrder(root) {
    if (root === null) return root;

    inOrder(root.left);
    console.log(root.data);
    inOrder(root.right);
}

function reBalance(root) {
    if (root === null) return root;
    const stack = [ root ];

    console.log(stack)
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let newArr = arrSorter(arr)
root = sortedArrayToBST(newArr, 0, newArr.length - 1);

insert(15)
insert(30)
insert(18)
insert(1651)
// deleteKey(23)
// find(root, 4)
// levelOrder(root)
// depthFirst(root)
// isBalanced(root)
// findHeight(root, 8)
// console.log(findDepth(root, 4))
prettyPrint(root)
