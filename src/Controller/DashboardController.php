<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/dashboard/{spaRoute}", name="app_dashboard", requirements={"spaRoute" = ".+"}, defaults={"spaRoute" = null}, methods={"GET"})
     */
    public function show(): Response
    {
        return $this->render('dashboard.html.twig');
    }

    /**
     * @Route("/get-profile", methods={"GET", "POST"})
     */
    public function profile(Request $request): Response
    {
    	return $this->json(['success' => time()]);
    }
}
