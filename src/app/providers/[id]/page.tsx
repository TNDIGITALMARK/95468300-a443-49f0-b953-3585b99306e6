'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, MapPin, Clock, Calendar, Video, Phone, Users, Award, Languages, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockProviders } from '@/data/providers';
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function ProviderProfilePage() {
  const params = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedConsultationType, setSelectedConsultationType] = useState('video');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const provider = mockProviders.find(p => p.id === params.id);

  if (!provider) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Provider Not Found</h1>
          <p className="text-gray-600 mb-8">The provider you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAvailableTimeSlots = (date: Date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return provider.availability[dayName] || [];
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTimeSlot) {
      // In a real app, this would make an API call to book the appointment
      alert(`Appointment booked with ${provider.name} for ${formatDate(selectedDate)} at ${selectedTimeSlot}`);
      setIsBookingDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Provider Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="w-32 h-32 bg-muted rounded-full hidden items-center justify-center">
                      <span className="text-4xl font-semibold text-muted-foreground">
                        {provider.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-3xl font-bold">{provider.name}</h1>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {provider.specialty}
                      </Badge>
                    </div>

                    <p className="text-xl text-gray-600 mb-4">{provider.title}</p>

                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold text-lg">{provider.rating}</span>
                        <span className="text-gray-600 ml-1">
                          ({provider.reviewCount} reviews)
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Users className="w-5 h-5 mr-2" />
                        <span>{provider.experience} experience</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        {provider.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Available today
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Details Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      About Dr. {provider.name.split(' ')[1]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{provider.about}</p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center">
                          <Languages className="w-5 h-5 mr-2" />
                          Languages Spoken
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {provider.languages.map(language => (
                            <Badge key={language} variant="outline">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Consultation Types</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="flex items-center">
                            <Video className="w-4 h-4 mr-1" />
                            Video Call
                          </Badge>
                          <Badge variant="outline" className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            Phone Call
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services">
                <Card>
                  <CardHeader>
                    <CardTitle>Services Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {provider.services.map(service => (
                        <div key={service} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Education & Training
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {provider.education.map((edu, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <span className="text-gray-700">{edu}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mock reviews */}
                      {[
                        { name: "Sarah M.", rating: 5, comment: "Excellent care and very thorough. Dr. Chen took time to explain everything clearly." },
                        { name: "James K.", rating: 5, comment: "Professional and knowledgeable. Would definitely recommend." },
                        { name: "Maria L.", rating: 4, comment: "Good experience overall. The video consultation was convenient." }
                      ].map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="ml-2 font-medium">{review.name}</span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book Consultation</span>
                  <span className="text-2xl font-bold text-primary">
                    ${provider.consultationFee}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Consultation Type
                  </label>
                  <Select value={selectedConsultationType} onValueChange={setSelectedConsultationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center">
                          <Video className="w-4 h-4 mr-2" />
                          Video Call
                        </div>
                      </SelectItem>
                      <SelectItem value="phone">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Call
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Date
                  </label>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                    className="rounded-md border"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Available Times for {formatDate(selectedDate)}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {getAvailableTimeSlots(selectedDate).map(time => (
                        <Button
                          key={time}
                          variant={selectedTimeSlot === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTimeSlot(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    {getAvailableTimeSlots(selectedDate).length === 0 && (
                      <p className="text-gray-600 text-sm">No available times for this date.</p>
                    )}
                  </div>
                )}

                <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      disabled={!selectedDate || !selectedTimeSlot}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Appointment</DialogTitle>
                      <DialogDescription>
                        Please confirm your appointment details below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Provider:</span>
                          <p>{provider.name}</p>
                        </div>
                        <div>
                          <span className="font-medium">Specialty:</span>
                          <p>{provider.specialty}</p>
                        </div>
                        <div>
                          <span className="font-medium">Date:</span>
                          <p>{selectedDate && formatDate(selectedDate)}</p>
                        </div>
                        <div>
                          <span className="font-medium">Time:</span>
                          <p>{selectedTimeSlot}</p>
                        </div>
                        <div>
                          <span className="font-medium">Type:</span>
                          <p className="capitalize">{selectedConsultationType} consultation</p>
                        </div>
                        <div>
                          <span className="font-medium">Fee:</span>
                          <p>${provider.consultationFee}</p>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleBookAppointment}>
                        Confirm Booking
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="text-center text-sm text-gray-600">
                  <p>💚 Instant confirmation</p>
                  <p>🔒 HIPAA compliant</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}