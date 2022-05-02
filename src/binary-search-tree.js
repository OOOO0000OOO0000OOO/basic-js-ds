const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data) {
      if (!node)
        return new Node(data);

      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }

      return node;
    }
  }

  find(data) {
    return findNode(this.rootNode, data);

    function findNode(node, data) {
      if (!node)
        return null;

      if (node.data === data)
        return node;

      return data < node.data
        ? findNode(node.left, data)
        : findNode(node.right, data);
    }
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
      } else {
        //Node to be deleted is a leaf.
        if (!node.left && !node.right) return null;
        //Node to be deleted has only one child.
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        // Node to be deleted has both children.
        // Find the successor of a node (the minimum value in a right child)
        // and set this value on the current node deleting the old successor node.
        let successor = node.right;

        while (successor.left) {
          successor = successor.left;
        }

        node.data = successor.data;
        node.right = removeNode(node.right, successor.data);
      }

      return node;
    }
  }

  min() {
    let node = this.rootNode;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.rootNode;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};