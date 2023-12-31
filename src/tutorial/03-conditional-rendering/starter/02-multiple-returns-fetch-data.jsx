import { useEffect, useState } from "react";
const url = "https://api.github.com/users/QuincyLarson";
// diff between fetch and axios is fetch does not consider response in 400 or 500 to be error

// someObject = {name: obj1}
// someObject.name, someObject.propertyThatDoesNotExist (underfine) is all ok
// const randomVal = null, randomVal.name is not ok
// examples are noted below with placement of destructuring user
// use ? for optional chaining
// take away is that order does matter
// Rule: don't move hooks conditionally
// do not add fetchData to dependency array, if function fetchUser is outside the useEffect ignore lint warnings. Will not have a problem if react made using vite

const MultipleReturnsFetchData = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        const user = await response.json();
        setUser(user);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <h2> is loading...</h2>;
  }

  if (isError) {
    return <h2> error detected </h2>;
  }

  // need to destructure after condition as user is null before fetch
  const { avatar_url, name, bio, company } = user;

  return (
    <div>
      <img
        style={{ width: "150px", borderRadius: "25px" }}
        src={avatar_url}
        alt={name}
      />
      <h2> {name} </h2>
      <h4> works at {company} </h4>
      <p> {bio} </p>
    </div>
  );
};

export default MultipleReturnsFetchData;
