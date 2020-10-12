export const dateFormatter = (date_string) => {
  var date = new Date(date_string);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  options.timeZone = "UTC";
  options.timeZoneName = "short";
  let tempDate = date.toLocaleString("en-US", options);
  tempDate = tempDate.split(",");
  tempDate[1] = tempDate[1].split(" ").reverse().join(" ");
  let string = [tempDate[1], tempDate[2]].join("");
  return string;
};
