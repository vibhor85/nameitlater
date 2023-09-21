const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Chat app</span>
      <div className='user'>
        <img
          src='https://images.pexels.com/photos/18091774/pexels-photo-18091774/free-photo-of-elizaveta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='user-image'
        />
        <span>John</span>
        <button>logout</button>
      </div>
    </div>
  );
};
export default Navbar;
