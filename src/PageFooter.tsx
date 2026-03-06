
export default function PageFooter() {
  return(
    <>
      <div className="pagefooter">
        <p>&copy; <i>Patrick Stanek</i>, {new Date().getFullYear()}</p> 
        <a href="github.com/ptstanek">[ Github Profile ] </a>       
      </div>
    </>
  );
}