import { Link } from 'react-router-dom';
import { CustomerSignup } from './customerSignUp';
import { Login } from './LogIn';
import Customer_review from './customer_review';
import './LandingPage.css';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import Middle_bar from './middlebar';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-wrapper">
      <div className="landing-card">
        <Header></Header>
        <div id='middle'>
          <Middle_bar></Middle_bar>
        </div>

        <div className='customer_reviews'>
          <h2>Customer Reviews</h2>
          <div className="customer_reviews_slider">
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Alice" review="The apartment was clean, spacious, and exactly as listed. The landlord was helpful and responsive. I felt right at home from day one." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Bob" review="Fantastic stay! The room was cozy and the location was ideal — close to shops and public transport. Booking was quick and hassle-free." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Charlie" review="Stayed here for 5 months. The roommates were respectful, the kitchen was well-equipped, and the internet was fast. Great for remote work." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Diana" review="Really appreciated the cleanliness and maintenance of the place. The landlord ensured everything was smooth during move-in and move-out." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Ethan" review="A wonderful renting experience! The house was just like the pictures and the environment was peaceful. Would definitely stay here again." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Alice" review="The apartment was clean, spacious, and exactly as listed. The landlord was helpful and responsive. I felt right at home from day one." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Bob" review="Fantastic stay! The room was cozy and the location was ideal — close to shops and public transport. Booking was quick and hassle-free." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Charlie" review="Stayed here for 5 months. The roommates were respectful, the kitchen was well-equipped, and the internet was fast. Great for remote work." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Diana" review="Really appreciated the cleanliness and maintenance of the place. The landlord ensured everything was smooth during move-in and move-out." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Ethan" review="A wonderful renting experience! The house was just like the pictures and the environment was peaceful. Would definitely stay here again." />
          </div>
        </div>

        <div className='owner_reviews'>
          <h2>Owner Reviews</h2>
          <div className="owner_reviews_slider">
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Mr. Singh" review="The tenant followed all house rules and maintained the space well. It was a smooth renting experience." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Mrs. Iyer" review="Communication was clear and timely. Rent was paid on time, and there were no issues at all." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Rahul Patel" review="Very respectful tenant. Left the room neat and clean. Would definitely rent again." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Anita Sharma" review="The stay was issue-free. My property was treated with care. Great experience overall!" />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Mohammed Ali" review="Good communication and responsibility shown by the tenant. No complaints throughout the lease." />

            {/* Duplicated for smooth scroll */}
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Mr. Singh" review="The tenant followed all house rules and maintained the space well. It was a smooth renting experience." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Mrs. Iyer" review="Communication was clear and timely. Rent was paid on time, and there were no issues at all." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Rahul Patel" review="Very respectful tenant. Left the room neat and clean. Would definitely rent again." />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Anita Sharma" review="The stay was issue-free. My property was treated with care. Great experience overall!" />
            <Customer_review img_url="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" name="Mohammed Ali" review="Good communication and responsibility shown by the tenant. No complaints throughout the lease." />
          </div>
        </div>


      </div>
    </div>
  );
}

export default LandingPage;
