'use client';

import { useState } from 'react';
import { Calendar, Clock, Video, Phone, User, FileText, Heart, Pill, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockAppointments, mockProviders, mockPatient } from '@/data/providers';
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function PatientDashboard() {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'scheduled');
  const pastAppointments = mockAppointments.filter(apt => apt.status === 'completed');

  const getProviderById = (providerId: string) => {
    return mockProviders.find(p => p.id === providerId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-primary/20 text-primary';
      case 'completed': return 'bg-trust-green/20 text-trust-green';
      case 'cancelled': return 'bg-destructive/20 text-destructive';
      case 'in-progress': return 'bg-warning-orange/20 text-warning-orange';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const startVideoCall = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setIsVideoCallOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {mockPatient.name}
          </h1>
          <p className="text-gray-600">Manage your appointments and health records</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">{pastAppointments.length}</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Providers</p>
                  <p className="text-2xl font-bold">{mockProviders.length}</p>
                </div>
                <User className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <Heart className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="health-records">Health Records</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              </TabsList>

              <TabsContent value="appointments" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Your Appointments</h2>
                  <Link href="/">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Book New
                    </Button>
                  </Link>
                </div>

                {/* Upcoming Appointments */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
                  {upcomingAppointments.map(appointment => {
                    const provider = getProviderById(appointment.providerId);
                    return (
                      <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{provider?.name}</h4>
                                <p className="text-gray-600">{provider?.specialty}</p>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(appointment.date)} at {appointment.time}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>

                              {appointment.type === 'video' && (
                                <Button
                                  size="sm"
                                  onClick={() => startVideoCall(appointment.id)}
                                  className="bg-primary hover:bg-primary/90"
                                >
                                  <Video className="w-4 h-4 mr-2" />
                                  Join Call
                                </Button>
                              )}

                              {appointment.type === 'phone' && (
                                <Button size="sm" variant="outline">
                                  <Phone className="w-4 h-4 mr-2" />
                                  Call
                                </Button>
                              )}
                            </div>
                          </div>

                          {appointment.notes && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">{appointment.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}

                  {upcomingAppointments.length === 0 && (
                    <div className="text-center py-8 text-gray-600">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No upcoming appointments</p>
                      <Link href="/">
                        <Button className="mt-4">Book Your First Appointment</Button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Past Appointments */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Past Appointments</h3>
                  {pastAppointments.map(appointment => {
                    const provider = getProviderById(appointment.providerId);
                    return (
                      <Card key={appointment.id} className="opacity-75">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{provider?.name}</h4>
                                <p className="text-gray-600">{provider?.specialty}</p>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(appointment.date)} at {appointment.time}
                                </div>
                              </div>
                            </div>

                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="health-records">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Health Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Medical History</h4>
                      <div className="space-y-2">
                        {mockPatient.medicalHistory.map((condition, index) => (
                          <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
                            <span>{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Allergies</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockPatient.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescriptions">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Pill className="w-5 h-5 mr-2" />
                      Current Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockPatient.currentMedications.map((medication, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <Pill className="w-4 h-4 text-blue-500 mr-3" />
                            <span>{medication}</span>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Name:</span>
                  <p className="text-gray-600">{mockPatient.name}</p>
                </div>
                <div>
                  <span className="font-medium">Email:</span>
                  <p className="text-gray-600">{mockPatient.email}</p>
                </div>
                <div>
                  <span className="font-medium">Phone:</span>
                  <p className="text-gray-600">{mockPatient.phone}</p>
                </div>
                <div>
                  <span className="font-medium">Date of Birth:</span>
                  <p className="text-gray-600">{new Date(mockPatient.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-medium">Name:</span>
                  <p className="text-gray-600">{mockPatient.emergencyContact.name}</p>
                </div>
                <div>
                  <span className="font-medium">Phone:</span>
                  <p className="text-gray-600">{mockPatient.emergencyContact.phone}</p>
                </div>
                <div>
                  <span className="font-medium">Relationship:</span>
                  <p className="text-gray-600">{mockPatient.emergencyContact.relationship}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Records
                </Button>
                <Button variant="outline" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Update Insurance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Call Dialog */}
        <Dialog open={isVideoCallOpen} onOpenChange={setIsVideoCallOpen}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Video Consultation</DialogTitle>
              <DialogDescription>
                You're now connected with your healthcare provider
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 bg-gray-900 rounded-lg flex items-center justify-center relative">
              <div className="absolute inset-4 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Video Call Active</h3>
                  <p className="opacity-75">Connected with your provider</p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <Button size="sm" variant="secondary">
                  🎤 Mute
                </Button>
                <Button size="sm" variant="secondary">
                  📹 Camera
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setIsVideoCallOpen(false)}>
                  End Call
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}