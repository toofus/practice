<?php

namespace App\DataTransferObject;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class DemoDTO implements \JsonSerializable
{
	/**
	 * @Assert\NotBlank
	 * @Assert\Type("digit")
	 */
	public $id;

	/**
	 * @Assert\NotBlank
	 * @Assert\Length(min = 5)
	 */
	public $name;

	/**
	 * @Assert\NotBlank
	 * @Assert\Length(min = 5)
	 */
	public $phone;

	/**
	 * @Assert\Image(
	 *  mimeTypes = "image/*",
     *  maxSize = "1M"
	 * )
	 */
	public $upload;

	public function __construct($id, $name, $phone, $media, UploadedFile $upload = null)
	{
		$this->id = $id;
		$this->name = $name;
		$this->phone = $phone;
		$this->media = $media;
		if (!empty($upload)) {
			$this->upload = $upload;
			$this->media = $upload->getClientOriginalName();
		}
	}

	/**
	 * @Assert\Callback
	 */
	public function validate(ExecutionContextInterface $context, $payload)
	{
		if (empty($this->media) && empty($this->upload)) {
			$context->buildViolation('Please add a photo')
				->atPath('upload')
				->addViolation();
		}
	}

	public function jsonSerialize()
	{
		return [
			'id' => $this->id,
			'name' => $this->name,
			'phone' => $this->phone,
			'media' => $this->media,
		];
	}
}
