import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AuthoritiesAction from "../../../../action/RolesAction/authorize";
import * as types from "../../../../action/type";
export default function Authorities() {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.RoleReducer);
  const { authorities } = useSelector(
    (state) => state.AuthoritiesReducer
  );


  const {users} = useSelector((state)=> state.UserReducer);

  const getAllRoles = () => {
    dispatch({
      type: AuthoritiesAction.GET_ALL_ROLES_ACTION,
      data: types.GET_ALL_ROLES,
    });
  };

  const getAllUsers = ()=>{
    dispatch({
      type: AuthoritiesAction.GET_ALL_USERS_ACTION,
      data: types.GET_ALL_USERS
    });
  };

  const renderRoles = () => {
    return roles.map((r, i) => {
      return <th key={i}>{r.rolename}</th>;
    });
  };

  const renderAuthorities = () => {
      return users.map((a, i) => {
        return (
          <tr key={i}>
            <td>{a.username}</td>
            {roles.map((r, ind) => {
              return (
                <th className="text-center" key={ind}>
                  <input
                    type="checkbox"
                    checked={fillAuthorities(a, r)}
                    onClick={() => authorize(a, r)}
                  />
                </th>
              );
            })}
          </tr>
        );
      });
   
  };

  const fillAuthorities = (account, roles) => {
    if (authorities) {
      return authorities.find(
        (a) =>
          a.user.username === account.username && a.roles.roleid === roles.roleid
      );
    }
  };

  const authorize = (account, roles) => {
    let authority = fillAuthorities(account, roles);
    if (authority) {
      deleteAuthorities(authority);
    } else {
      authority = { user: account, roles: roles };
      addAuthorities(authority);
    }
  };

  const addAuthorities = (authorities) => {
    dispatch({
      type: AuthoritiesAction.ADD_AUTHORITIES_ACTION,
      authorities
    });
  };

  const deleteAuthorities = (authorities) => {
    dispatch({
      type: AuthoritiesAction.DELETE_AUTHORITIES_ACTION,
      authorities
    });
  };

  const getAllAuthorities = () => {
    dispatch({
      type: AuthoritiesAction.GET_ALL_AUTHORITIES_ACTION,
      data: types.GET_ALL_AUTHORITIES,
    });
  };

  useEffect(() => {
    getAllAuthorities();
    getAllRoles();
    getAllUsers();
    return () => {};
  }, []);

  return (
    <div>
      <div className="container body">
        <div className="main_container">
          <div className="right_col" role="main">
            <div className>
              <div className="clearfix" />
              <div className="col-md-12 col-sm-12 ">
                <div className="x_panel">
                  <div className="x_title">
                    <h2>
                      <small>AUTHORIZING</small>
                    </h2>
                    <div className="clearfix" />
                  </div>
                  <div className="x_content">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="card-box table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th></th>
                                {renderRoles()}
                              </tr>
                            </thead>
                            <tbody>
                              {renderAuthorities()}
                              </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
