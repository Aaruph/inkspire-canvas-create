
import ArtistLayout from '@/components/artist/ArtistLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, User, Calendar } from 'lucide-react';

const ArtistReviews = () => {
  const reviews = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      rating: 5,
      date: '2024-06-28',
      tattooDesign: 'Floral Sleeve',
      comment: 'Amazing work! The detail in the flowers is incredible. Marcus really brought my vision to life. Highly recommend!',
      verified: true,
    },
    {
      id: 2,
      clientName: 'Mike Chen',
      rating: 5,
      date: '2024-06-25',
      tattooDesign: 'Geometric Pattern',
      comment: 'Professional, clean, and the geometric design came out perfect. Great attention to detail and very patient with adjustments.',
      verified: true,
    },
    {
      id: 3,
      clientName: 'Emma Davis',
      rating: 4,
      date: '2024-06-20',
      tattooDesign: 'Custom Portrait',
      comment: 'Really happy with the portrait tattoo. The likeness is spot on and the shading work is excellent. Will definitely come back!',
      verified: true,
    },
    {
      id: 4,
      clientName: 'Alex Rivera',
      rating: 5,
      date: '2024-06-18',
      tattooDesign: 'Traditional Dragon',
      comment: 'Best tattoo experience I\'ve ever had. Marcus is incredibly skilled and the studio environment is very comfortable.',
      verified: true,
    },
    {
      id: 5,
      clientName: 'Jessica Wong',
      rating: 5,
      date: '2024-06-15',
      tattooDesign: 'Minimalist Design',
      comment: 'Perfect execution of my minimalist concept. Clean lines and exactly what I wanted. Professional and friendly service.',
      verified: true,
    },
    {
      id: 6,
      clientName: 'David Thompson',
      rating: 4,
      date: '2024-06-10',
      tattooDesign: 'Script Lettering',
      comment: 'Great lettering work. The font choice and placement were perfect. Very satisfied with the final result.',
      verified: false,
    },
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <ArtistLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Customer Reviews</h1>
          <p className="text-muted-foreground">
            See what your clients are saying about your work.
          </p>
        </div>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-card-foreground">Overall Rating</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-card-foreground mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-muted-foreground">{totalReviews} reviews</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-card-foreground">Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={rating} className="flex items-center space-x-3 mb-2">
                  <span className="text-foreground w-4">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${totalReviews > 0 ? (ratingDistribution[index] / totalReviews) * 100 : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-muted-foreground w-8 text-right">
                    {ratingDistribution[index]}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-foreground">{review.clientName}</h3>
                          {review.verified && (
                            <Badge variant="outline" className="text-success border-success/50">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.tattooDesign}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        {renderStars(review.rating)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ArtistLayout>
  );
};

export default ArtistReviews;
