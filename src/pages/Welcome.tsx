import React from "react";

import { getUser } from "services/api";

export const Welcome: React.FC = () => {

  const user = getUser();

return user ? <p>Welcome {user.email}</p> : <p>Click above to login!</p>
};
