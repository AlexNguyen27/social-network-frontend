export const arrayToObject = (array) => {
  return array.reduce((obj, item) => {
    if (item.id) {
      obj[item.id] = item;
      if (item.posts) {
        obj[item.id].totalPosts = item.posts.length;
      }
    }
    return obj;
  }, {});
};

export function getPopularPost(o, n) {
  var keys = Object.keys(o).map((key) => o[key]);
  console.log(keys);
  keys.sort(function (a, b) {
    return b.reactions.length - a.reactions.length;
  });
  return keys.slice(0, n);
}
