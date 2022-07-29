export const categories = { Choice: "选择题", QA: "问答题" };
export const getLevelStar = (level: number) => {
  var str = "";
  var roundLevel = Math.floor(level);
  for (var i = 0; i < roundLevel; i++) {
    str += "★";
  }

  if (level - roundLevel > 0) str += "☆";
  return str;
};
